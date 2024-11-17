import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export interface StatsCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description?: string;
}

export function StatsCard({ icon, title, value, description }: StatsCardProps) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            {icon}
            <span className="ml-2">{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          {description && <p className="text-sm text-gray-500">{description}</p>}
        </CardContent>
      </Card>
    );
  }
  