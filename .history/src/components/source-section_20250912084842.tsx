import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function SourceSection() {
  return (
    <section className="py-20 bg-coffee-cream text-[#032524]">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Ethiopia: The Birthplace of Coffee
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Order  premium coffee beans, straight from the sourced e
            lush highlands of Ethiopia where coffee cultivation began over a
            thousand years ago.
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
                Ethiopia is the birthplace of coffee, with a rich history dating
                back to the 9th century. Our beans are carefully selected from
                sustainable farms in the Sidamo and Yirgacheffe regions, known
                for their exceptional quality and unique flavor profiles.
              </p>
              <p>
                We work directly with local cooperatives to ensure fair trade
                practices and support the communities that have nurtured this
                precious crop for generations.
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d156494.34831439753!2d38.62225209678101!3d8.96331380277265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa%2C%20Ethiopia!5e1!3m2!1sen!2sng!4v1757663119652!5m2!1sen!2sng"
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
