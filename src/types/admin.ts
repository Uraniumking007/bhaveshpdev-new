export type AdminBackdoorEntry = {
  id: string;
  hostname: string | null;
  payment: number | null;
  statuscode: "authorized" | "partial" | "unauthorized";
  createdAt: string;
};

export type AdminTimelineEntry = {
  id: string;
  yearStart: string | null;
  yearEnd: string | null;
  ongoing: boolean | null;
  title: string | null;
  description: string | null;
  type: string | null;
};
