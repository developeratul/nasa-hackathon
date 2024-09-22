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
import { Card, CardContent, CardHeader } from "../ui/card";

export default function LastSoilConditionReport() {
  return (
    <Card>
      <CardHeader className="text-xl font-semibold tracking-tight text-primary">
        Last Soil Condition Report
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of suggested crops based on your soil type.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Parameter</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Description/Insights</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Soil Type</TableCell>
              <TableCell>Loam</TableCell>
              <TableCell>
                Balanced mix of sand, silt, and clay, ideal for a wide variety of crops.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Nutrient Content</TableCell>
              <TableCell>N: 40 mg/kg, P: 30 mg/kg, K: 45 mg/kg</TableCell>
              <TableCell>
                Moderate levels of nitrogen and phosphorus, and high potassium content, suitable for
                most crops.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Moisture Levels</TableCell>
              <TableCell>30%</TableCell>
              <TableCell>
                Adequate moisture for plant growth, but may require irrigation depending on upcoming
                weather.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">pH Level</TableCell>
              <TableCell>6.5 (Slightly acidic)</TableCell>
              <TableCell>
                Ideal pH for many crops such as tomatoes, potatoes, and carrots.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Soil Texture</TableCell>
              <TableCell>Sand: 40%, Silt: 40%, Clay: 20%</TableCell>
              <TableCell>
                Well-balanced loam soil, offering good drainage and nutrient retention.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Crop Suitability</TableCell>
              <TableCell>Recommended for Tomatoes, Potatoes, Lettuce</TableCell>
              <TableCell>
                These crops will thrive in the current soil condition. Alternative crops: peppers,
                beans, and carrots.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Fertilizer Recommendations</TableCell>
              <TableCell>Apply 5kg of organic compost per 100m²</TableCell>
              <TableCell>
                Suggested to boost nitrogen and phosphorus levels for optimal crop growth.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Weather Impacts</TableCell>
              <TableCell>Rain expected in 3 days, temp: 22°C</TableCell>
              <TableCell>
                Mild weather with rain, good for maintaining soil moisture. Monitor for potential
                overwatering.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Next Steps</TableCell>
              <TableCell>Irrigation needed in 5-7 days, plant at 3 cm depth</TableCell>
              <TableCell>
                Water sparingly after rain, monitor moisture levels. Ensure crop is planted at
                optimal depth.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
