export function cleanLatexMarkdown(text:string) {
  let cleaned = text.replace(/<Exploring...>/g, "");
  cleaned = cleaned.replace(
    /\\\[(.*?)\\\]/gs,
    (_, expr) => `$$${expr.trim()}$$`
  );
  cleaned = cleaned.replace(/\\\((.*?)\\\)/gs, (_, expr) => `$${expr.trim()}$`);
  const parts = cleaned.split(/($$.*?$$)/gs);

  for (let i = 0; i < parts.length; i++) {
    if (!parts[i].startsWith("$$") || !parts[i].endsWith("$$")) {
      parts[i] = parts[i].replace(/\$+/g, "$");
    }
  }

  return parts.join("");
}
