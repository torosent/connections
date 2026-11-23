import ConnectionsGame from "@/components/ConnectionsGame";
import connectionsDataEn from "@/data/connections.json";
import type { ConnectionPuzzle } from "@/types";

export default function EnglishHomePage() {
  return (
    <ConnectionsGame
      locale="en"
      puzzles={connectionsDataEn as ConnectionPuzzle[]}
    />
  );
}
