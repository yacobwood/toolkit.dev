export default function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-6 text-center text-sm text-muted">
        &copy; {new Date().getFullYear()} ToolKit.dev &mdash; Free developer tools
      </div>
    </footer>
  );
}
