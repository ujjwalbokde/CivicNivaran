// app/unauthorized/page.js
export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-500 text-lg">
          You do not have permission to access this page.
        </p>
      </div>
    </div>
  );
}
