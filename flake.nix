{
  description = "Skippy";

  inputs.nixpkgs.url = "nixpkgs/nixos-25.11";
  inputs.utils.url = "github:numtide/flake-utils";

  outputs =
    {
      self,
      nixpkgs,
      utils,
    }:
    utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs { inherit system; };
      in
      {
        devShell = pkgs.mkShell {
          buildInputs = with pkgs; [
            deno
          ];
        };
      }
    );
}
