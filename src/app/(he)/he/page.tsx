import ConnectionsGame from "@/components/ConnectionsGame";
import connectionsDataHe from "@/data/connections-he.json";
import type { ConnectionPuzzle } from "@/types";

export default function HebrewHomePage() {
  return (
    <ConnectionsGame
      locale="he"
      puzzles={connectionsDataHe as ConnectionPuzzle[]}
    />
  );
}
