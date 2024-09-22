"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

export default function CropSuggestions() {
  return (
    <Card>
      <CardHeader className="text-xl font-semibold tracking-tight text-primary">
        Crop Suggestions
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of suggested crops based on your soil type.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>Soil Type</TableHead>
              <TableHead>Crop Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Dhaka</TableCell>
              <TableCell>Loam</TableCell>
              <TableCell>
                <Badge>Tomato</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Dhaka</TableCell>
              <TableCell>Loam</TableCell>
              <TableCell>
                <Badge>Tomato</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Rajshahi</TableCell>
              <TableCell>Loam</TableCell>
              <TableCell>
                <Badge>Tomato</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Sylhet</TableCell>
              <TableCell>Loam</TableCell>
              <TableCell>
                <Badge>Tomato</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Dhaka</TableCell>
              <TableCell>Loam</TableCell>
              <TableCell>
                <Badge>Tomato</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
