import { ComparisonType } from "@hashmicro/shared-types";

export function compareStrings(input1: string, input2: string, type: ComparisonType) {
  const chars = input1.split("");
  let matchCount = 0;
  const matchedChars: string[] = [];

  for (const char of chars) {
    let isMatch = false;

    if (type === "sensitive") {
      isMatch = input2.includes(char);
    } else {
      isMatch = input2.toLowerCase().includes(char.toLowerCase());
    }

    if (isMatch && !matchedChars.includes(char.toLowerCase())) {
      matchCount++;
      matchedChars.push(char.toLowerCase());
    }
  }

  const percentage = (matchCount / chars.length) * 100;

  return {
    input1,
    input2,
    type,
    totalChars: chars.length,
    matchedChars: matchedChars.length,
    percentage: Math.round(percentage * 100) / 100,
  };
}
