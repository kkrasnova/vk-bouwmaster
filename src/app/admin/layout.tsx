export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Этот layout переопределяет корневой layout для админ-панели
  // Не включаем Navigation и Footer
  return (
    <>
      {children}
    </>
  );
}

