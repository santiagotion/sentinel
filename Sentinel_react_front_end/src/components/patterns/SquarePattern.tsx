export function SquarePattern() {
  return (
    <div className="absolute inset-0 opacity-50 dark:opacity-40 pointer-events-none">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%234b5563' stroke-width='1.5' opacity='0.7'%3E%3Crect x='0' y='0' width='60' height='60'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '60px 60px',
        backgroundPosition: 'center',
      }}></div>
    </div>
  );
}