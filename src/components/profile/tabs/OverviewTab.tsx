// components/profile/tabs/OverviewTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatsCard } from "../StatsCard";
import { ActivityItem } from "../ActivityItem";
import { Download } from "lucide-react";

export function OverviewTab() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <StatsCard
              icon={<Download className="w-4 h-4" />}
              title="Total Downloads"
              value="23"
            />
            {/* Add other stats */}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[200px]">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <ActivityItem
                  key={i}
                  icon={<Download className="w-4 h-4" />}
                  title={`Downloaded Asset #${i}`}
                  description="Asset description"
                  timestamp="2 hours ago"
                />
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}