import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Web3Background } from "./web3-background";

export function SourceSection() {
  return (
    <Web3Background pattern="blockchain" intensity="low">
      <section className="py-20 bg-[#032524]/10 text-[#032524]">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center  mb-12">
          <h1 className="lg:text-4xl text-2xl md:text-6xl font-bold mb-6">
            Ethiopia: The Birthplace of Coffee
          </h1>
          <p className="text-sm md:text-2xl max-w-3xl mx-auto">
            Order <span className="text-[#032524] font-semibold">premium</span> coffee beans, straight from the source, the
            lush highlands of Ethiopia where coffee cultivation began over a
            thousand years ago.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">

          <Card className="shadow-lg p-4">
      </div>
    </section>
    </Web3Background>
  );
}
