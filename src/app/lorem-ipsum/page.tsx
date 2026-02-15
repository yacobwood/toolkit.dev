"use client";

import { useState, useCallback } from "react";
import CopyButton from "@/components/CopyButton";

const WORDS = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "ac", "ante", "bibendum",
  "blandit", "congue", "consequat", "cras", "curabitur", "cursus", "diam",
  "dictum", "dignissim", "donec", "egestas", "elementum", "etiam", "eu",
  "euismod", "facilisis", "faucibus", "felis", "fermentum", "feugiat", "gravida",
  "habitant", "hendrerit", "iaculis", "integer", "interdum", "justo", "lacinia",
  "lacus", "laoreet", "lectus", "leo", "libero", "ligula", "lobortis", "luctus",
  "maecenas", "massa", "mattis", "mauris", "metus", "mi", "morbi", "nam", "nec",
  "neque", "nibh", "nisl", "nunc", "odio", "orci", "ornare", "pellentesque",
  "pharetra", "placerat", "porta", "porttitor", "posuere", "praesent", "pretium",
  "proin", "pulvinar", "purus", "quam", "risus", "rutrum", "sagittis", "sapien",
  "scelerisque", "semper", "sodales", "sollicitudin", "suscipit", "tellus",
  "tincidunt", "tortor", "tristique", "turpis", "ultrices", "ultricies", "urna",
  "varius", "vel", "vestibulum", "vitae", "vivamus", "viverra", "volutpat",
  "vulputate",
];

function randomWord(): string {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateSentence(minWords = 5, maxWords = 15): string {
  const length = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
  const words = Array.from({ length }, randomWord);
  words[0] = capitalize(words[0]);
  return words.join(" ") + ".";
}

function generateParagraph(minSentences = 3, maxSentences = 7): string {
  const length = minSentences + Math.floor(Math.random() * (maxSentences - minSentences + 1));
  return Array.from({ length }, () => generateSentence()).join(" ");
}

type Mode = "paragraphs" | "sentences" | "words";

export default function LoremIpsumGenerator() {
  const [mode, setMode] = useState<Mode>("paragraphs");
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState(() =>
    Array.from({ length: 3 }, () => generateParagraph()).join("\n\n")
  );

  const generate = useCallback(() => {
    let result: string;
    switch (mode) {
      case "paragraphs":
        result = Array.from({ length: count }, () => generateParagraph()).join(
          "\n\n"
        );
        break;
      case "sentences":
        result = Array.from({ length: count }, () => generateSentence()).join(
          " "
        );
        break;
      case "words":
        result = Array.from({ length: count }, randomWord).join(" ");
        result = capitalize(result) + ".";
        break;
    }
    setOutput(result);
  }, [mode, count]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lorem Ipsum Generator</h1>
        <p className="text-muted">
          Generate placeholder text by paragraphs, sentences, or words.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={generate}
            className="px-4 py-2 text-sm font-medium rounded-lg bg-accent text-white hover:bg-accent-hover transition-colors"
          >
            Generate
          </button>

          <div className="flex items-center gap-2">
            <label className="text-sm text-muted">Count:</label>
            <input
              type="number"
              min={1}
              max={50}
              value={count}
              onChange={(e) =>
                setCount(
                  Math.min(50, Math.max(1, parseInt(e.target.value) || 1))
                )
              }
              className="w-20 p-2 rounded-lg border border-border bg-surface text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {(["paragraphs", "sentences", "words"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md border capitalize transition-colors ${
                mode === m
                  ? "bg-accent text-white border-accent"
                  : "border-border bg-surface hover:bg-surface-hover"
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Output</label>
            {output && <CopyButton text={output} />}
          </div>
          <textarea
            value={output}
            readOnly
            className="w-full h-80 p-4 rounded-lg border border-border bg-surface text-sm resize-none focus:outline-none"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
