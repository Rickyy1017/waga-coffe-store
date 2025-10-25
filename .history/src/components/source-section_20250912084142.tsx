import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function SourceSection() {
  return (
    <section className="py-20  text-[#032524]">
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
           <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl"></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d424286.2740345001!2d36.94928475!3d9.145000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1631d35ca6d494fd%3A0x53fb9fc016b66cb!2sEthiopia!5e0!3m2!1sen!2sus!4v1690000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Map of Ethiopia"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
