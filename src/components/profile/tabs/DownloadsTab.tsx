// components/profile/tabs/DownloadsTab.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DownloadsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Download History</CardTitle>
        <CardDescription>Track your downloaded assets</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="aspect-video bg-gray-100 rounded-md mb-3"></div>
              <h3 className="font-medium">Asset Name #{i}</h3>
              <p className="text-sm text-gray-500">Downloaded on Nov 16, 2023</p>
              <Button variant="outline" size="sm" className="mt-3 w-full">
                Download Again
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}