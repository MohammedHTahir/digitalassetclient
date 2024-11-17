// components/profile/tabs/ActivityTab.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download } from "lucide-react";
import { ActivityItem } from "../ActivityItem";

export function ActivityTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>Your recent actions and changes</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <ActivityItem
                key={i}
                icon={<Download className="w-5 h-5" />}
                title="Downloaded Asset Name"
                description="Asset description or details"
                timestamp="2h ago"
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}



