export function downloadFileFromUrl(dataUrl?: string, filename?: string) {
    if (!dataUrl || dataUrl?.trim() === "" || !filename) {
        return;
    }

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    link.target = "_blank";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}