import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-4">About Us</h1>
          <p className="text-gray-700 mb-4">
            Welcome to our blog! We are passionate about sharing insightful content on travel, lifestyle, and personal experiences.
            Our mission is to provide high-quality, engaging articles that inspire and inform our readers.
          </p>
          <p className="text-gray-700 mb-4">
            Whether you're looking for travel guides, tips on daily life, or deep dives into interesting topics, we've got something for you.
            Stay connected with us as we continue to grow and bring you fresh content regularly.
          </p>
          <p className="text-gray-700 font-semibold">Thank you for visiting our blog. We appreciate your support!</p>
        </CardContent>
      </Card>
    </div>
  );
}
