import { login } from "@/lib/admin-auth-actions";

export default async function AdminLoginPage(
  props: PageProps<"/admin/login">
) {
  const searchParams = await props.searchParams;
  const hasError = searchParams.error === "1";

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-6 py-16">
      <h1 className="text-2xl font-bold text-white">Admin login</h1>
      <form action={login} className="mt-6 flex flex-col gap-3">
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoFocus
          required
          className="rounded-lg border border-white/10 bg-neutral-900 px-4 py-2.5 text-sm text-white outline-none focus:border-orange-500/50"
        />
        <button
          type="submit"
          className="rounded-lg bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-500"
        >
          Log in
        </button>
        {hasError && (
          <p className="text-sm text-red-400">Wrong password.</p>
        )}
      </form>
    </div>
  );
}
