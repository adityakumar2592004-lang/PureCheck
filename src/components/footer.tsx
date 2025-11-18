export function Footer() {
  return (
    <footer className="py-6 px-4 md:px-6 border-t bg-card">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} PureCheck. All rights reserved.</p>
        <p className="mt-1">Built for a healthier tomorrow.</p>
      </div>
    </footer>
  );
}
