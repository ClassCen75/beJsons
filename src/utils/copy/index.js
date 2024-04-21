export default async function copyTextUsingClipboardAPI(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Text copied successfully');
  } catch (err) {
    console.error('Failed to copy text', err);
  }
}
