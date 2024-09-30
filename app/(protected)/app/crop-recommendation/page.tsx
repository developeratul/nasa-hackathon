import GetCropRecommendationForm from "@/components/crop-recommendation/GetCropRecommendation";
import PreviousCropRecommendations from "@/components/crop-recommendation/PreviousCropRecommendations";

export default function CropRecommendationPage() {
  return (
    <main>
      <div className="grid grid-cols-3 gap-12">
        <div>
          <GetCropRecommendationForm />
        </div>
        <div className="col-span-2">
          <PreviousCropRecommendations />
        </div>
      </div>
    </main>
  );
}
