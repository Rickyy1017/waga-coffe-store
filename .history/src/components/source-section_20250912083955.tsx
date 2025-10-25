import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function SourceSection() {
  return (
    <section className="py-20 bg-coffee-cream text-coffee-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ethiopia: The Birthplace of Coffee
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Discover the origins of our premium coffee beans, sourced from the lush highlands of Ethiopia where coffee cultivation began over a thousand years ago.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Map Section */}
         

          {/* Information Section */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Our Ethiopian Heritage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Ethiopia is the birthplace of coffee, with a rich history dating back to the 9th century. Our beans are carefully selected from sustainable farms in the Sidamo and Yirgacheffe regions, known for their exceptional quality and unique flavor profiles.
              </p>
              <p>
                We work directly with local cooperatives to ensure fair trade practices and support the communities that have nurtured this precious crop for generations.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Single-origin beans from high-altitude farms</li>
                <li>Shade-grown and organic certified</li>
                <li>Traditional processing methods preserved</li>
                <li>Direct trade relationships with farmers</li>
              </ul>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </section>
  );
}
