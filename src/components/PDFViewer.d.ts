declare module "@/components/PDFViewer" {
  interface PDFViewerProps {
    url: string;
  }
  const PDFViewer: React.FC<PDFViewerProps>;
  export default PDFViewer;
}
