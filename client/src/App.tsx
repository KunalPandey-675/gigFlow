import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function App() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">
          A smarter lead workspace
        </h2>
        <p className="mt-2 text-muted-foreground">
          Track every lead, filter quickly, and keep your pipeline focused with a clean, fast UI.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-foreground font-medium">Status, source, and search</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">Pagination</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-foreground font-medium">Smooth page navigation</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-foreground font-medium">Secure sessions with auto-expiry</CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground">Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-foreground font-medium">Clear, searchable lead list</CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
