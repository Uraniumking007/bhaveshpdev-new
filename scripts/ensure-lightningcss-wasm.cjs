const fs = require("fs");
const path = require("path");

const projectRoot = path.join(__dirname, "..");
const nodeModulesDir = path.join(projectRoot, "node_modules");
const lightningcssDir = path.join(nodeModulesDir, "lightningcss");
const wasmPackageDir = path.join(nodeModulesDir, "lightningcss-wasm");
const pkgDir = path.join(lightningcssDir, "pkg");
const pkgIndex = path.join(pkgDir, "index.js");
const pkgPackageJson = path.join(pkgDir, "package.json");
const wasmNodeCjs = path.join(wasmPackageDir, "wasm-node.cjs");
const unknownShimDir = path.join(
  nodeModulesDir,
  "lightningcss-unknown-unknown"
);
const unknownShimIndex = path.join(unknownShimDir, "index.js");
const unknownShimPackageJson = path.join(unknownShimDir, "package.json");

if (!fs.existsSync(lightningcssDir) || !fs.existsSync(wasmPackageDir)) {
  process.exit(0);
}

fs.mkdirSync(pkgDir, { recursive: true });

const shimSource = `module.exports = require("lightningcss-wasm");\n`;

if (
  !fs.existsSync(pkgIndex) ||
  fs.readFileSync(pkgIndex, "utf8") !== shimSource
) {
  fs.writeFileSync(pkgIndex, shimSource, "utf8");
}

const pkgJson = {
  name: "lightningcss-native-shim",
  private: true,
  main: "./index.js",
};

if (!fs.existsSync(pkgPackageJson)) {
  fs.writeFileSync(pkgPackageJson, JSON.stringify(pkgJson, null, 2), "utf8");
}

if (fs.existsSync(wasmNodeCjs)) {
  const original = fs.readFileSync(wasmNodeCjs, "utf8");
  let modified = original.replace(
    'require("url".replace("", ""))',
    'require("url")'
  );
  if (
    !modified.includes(
      'const wasmPath = require.resolve("lightningcss-wasm/lightningcss_node.wasm");'
    )
  ) {
    modified = modified.replace(
      'var wasmBytes = import_fs.default.readFileSync(new URL("lightningcss_node.wasm", import_meta_url));',
      'const wasmPath = require.resolve("lightningcss-wasm/lightningcss_node.wasm");\nvar wasmBytes = import_fs.default.readFileSync(wasmPath);'
    );
  }
  if (modified !== original) {
    fs.writeFileSync(wasmNodeCjs, modified, "utf8");
  }
}

const nativeVariants = fs.existsSync(nodeModulesDir)
  ? fs
      .readdirSync(nodeModulesDir)
      .filter(
        (name) =>
          name.startsWith("lightningcss-") &&
          name !== "lightningcss" &&
          name !== "lightningcss-wasm" &&
          name !== "lightningcss-unknown-unknown"
      )
  : [];

const nativeTarget = nativeVariants.find((name) =>
  fs.existsSync(path.join(nodeModulesDir, name))
);

if (nativeTarget) {
  fs.mkdirSync(unknownShimDir, { recursive: true });
  const shimSource = `module.exports = require("${nativeTarget}");\n`;
  if (
    !fs.existsSync(unknownShimIndex) ||
    fs.readFileSync(unknownShimIndex, "utf8") !== shimSource
  ) {
    fs.writeFileSync(unknownShimIndex, shimSource, "utf8");
  }

  const shimPkg = {
    name: "lightningcss-unknown-unknown",
    private: true,
    main: "./index.js",
  };

  if (!fs.existsSync(unknownShimPackageJson)) {
    fs.writeFileSync(
      unknownShimPackageJson,
      JSON.stringify(shimPkg, null, 2),
      "utf8"
    );
  }
}
