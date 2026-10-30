// Recuadro que se muestra mientras un proyecto todavía no tiene portada ni screenshots.
export default function CoverPlaceholder({ title, note }: { title: string; note: string }) {
  return (
    <div className="cover-placeholder">
      <span className="cover-placeholder-title">{title}</span>
      <span className="cover-placeholder-note">{note}</span>
    </div>
  );
}
