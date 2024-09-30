"use client";

import { generateCropRecommendation } from "@/actions/crop.actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation } from "@tanstack/react-query";
import { CloudUpload } from "lucide-react";
import Dropzone from "react-dropzone";
import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function GetCropRecommendationForm() {
  const { mutateAsync, isSuccess, data, reset } = useMutation({
    mutationKey: ["get-crop-recommendation"],
    mutationFn: () => generateCropRecommendation(),
  });

  const handleGetCropRecommendation = async () => {
    try {
      toast.promise(mutateAsync(), {
        loading: "Getting expert recommendation...",
        success: (data) => data.message,
      });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div>
      <h2 className="font-semibold leading-none tracking-tight mb-3">Get Crop Recommendation</h2>
      {isSuccess ? (
        <Card className="border-green-500 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-600">Crop Recommendation</CardTitle>
            <CardDescription>
              We have created a list of crops that would be best to grow in your soil.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parameter</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Soil Type</TableCell>
                  <TableCell>{data.data.soilType}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Crop Suggs.</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      {data.data.list.map((item, index) => (
                        <Badge key={index}>{item}</Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Verdict</TableCell>
                  <TableCell>{data.data.suggestion}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button onClick={reset} variant="outline">
              Get Another Recommendation
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Dropzone
          accept={{ "image/*": [".png", ".jpg", ".webp", ".jpeg"] }}
          onDrop={handleGetCropRecommendation}
          multiple={false}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="w-full bg-muted border rounded-lg py-24 px-6">
              <div
                {...getRootProps()}
                className="w-full flex justify-center items-center text-center flex-col gap-y-3"
              >
                <input {...getInputProps()} />
                <CloudUpload className="w-24 h-24 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-primary text-base font-medium">
                    Drag n Drop your Soil image here
                  </p>
                  <p className="text-xs text-muted-foreground">
                    File type must be within .jpg, .jpeg, .webp, .png format
                  </p>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      )}
    </div>
  );
}
