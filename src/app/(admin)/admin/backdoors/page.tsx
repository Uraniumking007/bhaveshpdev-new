"use client";

import { useState, useEffect } from "react";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { BackdoorAdminCard } from "@/components/cards/backdoor-admin-card";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBackdoor, deleteBackdoor, getBackdoors } from "./actions";

export default function BackdoorsAdminPage() {
  const [backdoors, setBackdoors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newBackdoor, setNewBackdoor] = useState({
    hostname: "",
    payment: "",
    statuscode: "authorized" as "authorized" | "partial" | "unauthorized",
  });

  useEffect(() => {
    getBackdoors()
      .then(setBackdoors)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this backdoor?")) {
      try {
        const result = await deleteBackdoor(id);
        if (!result.success) throw new Error(result.error);
        setBackdoors(backdoors.filter((b) => b.id !== id));
      } catch (error) {
        console.error("Error deleting backdoor:", error);
        alert("Failed to delete backdoor");
      }
    }
  };

  const handleCreateBackdoor = async () => {
    try {
      const result = await createBackdoor({
        hostname: newBackdoor.hostname,
        payment: parseFloat(newBackdoor.payment),
        statuscode: newBackdoor.statuscode,
      });

      if (!result.success) throw new Error(result.error);

      // Refresh the backdoors list
      const updatedBackdoors = await getBackdoors();
      setBackdoors(updatedBackdoors);

      // Reset form and close modal
      setNewBackdoor({
        hostname: "",
        payment: "",
        statuscode: "authorized",
      });
      onClose();
    } catch (error) {
      console.error("Error creating backdoor:", error);
      alert("Failed to create backdoor");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading backdoors: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Backdoors</h1>
          <p className="text-white/70 mt-2">
            Manage your backdoor access and authorizations.
          </p>
        </div>
        <Button
          onClick={onOpen}
          className={cn(
            "bg-white/10 hover:bg-white/20 text-white",
            "transition-all duration-300",
            "flex items-center gap-2"
          )}
        >
          <IconPlus className="w-5 h-5" />
          Add Backdoor
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {backdoors?.map((backdoor) => (
          <BackdoorAdminCard
            key={backdoor.id}
            backdoor={backdoor}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        className="bg-white/5 border border-white/10"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-white">Add New Backdoor</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="hostname">Hostname</Label>
                    <Input
                      id="hostname"
                      name="hostname"
                      value={newBackdoor.hostname}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewBackdoor({
                          ...newBackdoor,
                          hostname: e.target.value,
                        })
                      }
                      className="text-white"
                      placeholder="Enter hostname"
                    />
                  </div>
                  <div>
                    <Label htmlFor="payment">Payment</Label>
                    <Input
                      id="payment"
                      name="payment"
                      type="number"
                      value={newBackdoor.payment}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNewBackdoor({
                          ...newBackdoor,
                          payment: e.target.value,
                        })
                      }
                      className="text-white"
                      placeholder="Enter payment amount"
                    />
                  </div>
                  <div>
                    <Label htmlFor="statuscode">Status</Label>
                    <select
                      id="statuscode"
                      name="statuscode"
                      value={newBackdoor.statuscode}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setNewBackdoor({
                          ...newBackdoor,
                          statuscode: e.target.value as
                            | "authorized"
                            | "partial"
                            | "unauthorized",
                        })
                      }
                      className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      <option value="authorized">Authorized</option>
                      <option value="partial">Partial</option>
                      <option value="unauthorized">Unauthorized</option>
                    </select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  onClick={onClose}
                  className={cn(
                    "bg-white/10 hover:bg-white/20 text-white",
                    "transition-all duration-300"
                  )}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleCreateBackdoor}
                  className={cn(
                    "bg-white/10 hover:bg-white/20 text-white",
                    "transition-all duration-300"
                  )}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
