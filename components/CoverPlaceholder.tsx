// Recuadro que se muestra mientras un proyecto todavía no tiene portada ni screenshots.
export default function CoverPlaceholder({ title }: { title: string }) {
  return (
    <div className="cover-placeholder">
      <span className="cover-placeholder-title">{title}</span>
      <span className="cover-placeholder-note">Screenshots coming soon</span>
    </div>
  );
}
