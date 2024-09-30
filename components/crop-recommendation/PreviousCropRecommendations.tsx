"use client";
import { getCropRecommendations } from "@/actions/crop.actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import Loader from "../common/Loader";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function PreviousCropRecommendations() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["get-previous-crop-recommendations"],
    queryFn: () => getCropRecommendations(),
  });

  if (isPending) {
    return (
      <Card className="p-4">
        <Loader />
      </Card>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="w-4 h-4" />
        <AlertTitle>Data fetching Error!</AlertTitle>
        <AlertDescription>{error.message}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Previous Recommendations</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Soil Type</TableHead>
              <TableHead>Crops</TableHead>
              <TableHead>Suggestion/Verdict</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((recommendation) => (
              <TableRow key={recommendation.id}>
                <TableCell className="font-semibold min-w-[100px]">
                  {recommendation.soilType}
                </TableCell>
                <TableCell className="py-4 min-w-[350px]">
                  {
                    <div className="flex flex-wrap gap-2">
                      {recommendation.list.map((item, index) => (
                        <Badge key={index}>{item}</Badge>
                      ))}
                    </div>
                  }
                </TableCell>
                <TableCell>{recommendation.suggestion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
