'use client'
import StarField from "@/components/animations/starfield";
import Footer from "@/components/ui/footer";
import Navbar from "@/components/ui/navbar";

export default function KnowMore() {
  const features = [
    {
      title: "Automated Liquidity Management for CLMM",
      items: [
        {
          name: "Dynamic Range Adjustment",
          description: "Automatically adjusts the liquidity range based on real-time market conditions."
        },
        {
          name: "Rebalancing",
          description: "Monitors price movements and reallocates liquidity when assets move out of the initial range."
        },
        {
          name: "Gas-Efficient Strategies",
          description: "Minimizes gas costs by bundling adjustments and only performing actions when cost-benefit analysis supports profitability."
        },
      ],
    },
    {
      title: "Impermanent Loss (IL) Calculator",
      items: [
        {
          name: "Custom Inputs",
          description: "Users can input current pool data or fetch it directly from supported protocols."
        },
        {
          name: "Detailed Reporting",
          description: "Provides a breakdown of IL, including fees earned, token price changes, and net impact."
        },
        {
          name: "Historical Analysis",
          description: "Visualizes past IL trends based on market movements and user activity."
        },
      ],
    },
    {
      title: "Pool Simulations (Full-Range & CLMM)",
      items: [
        {
          name: "Full-Range Pools",
          description: "Simulates traditional AMM strategies where liquidity is distributed across the entire price range."
        },
        {
          name: "CLMM Pools",
          description: "Allows users to define specific price ranges and simulate performance in Uniswap v3 or similar platforms."
        },
        {
          name: "Performance Metrics",
          description: "Provides APY predictions, fee generation estimates, and expected IL for each scenario."
        },
        {
          name: "Scenario Analysis",
          description: "Users can compare strategies side-by-side to identify the most profitable approach."
        },
      ],
    },
    {
      title: "Dashboard and Analytics",
      items: [
        {
          name: "Live Position Monitoring",
          description: "Displays current liquidity distribution, accumulated fees, and IL for active positions."
        },
        {
          name: "Market Insights",
          description: "Shows price trends, volatility data, and volume metrics for supported pools."
        },
        {
          name: "Notifications",
          description: "Alerts users when significant events occur, such as liquidity leaving a defined range or optimal rebalancing opportunities."
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-primary">
      <StarField />
      <Navbar />
      <main className="flex-grow container mx-auto p-6">
        <section className="bg-secondary shadow-md rounded-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-accent mb-4">
            Lumos: Advanced Liquidity Management Platform for CLMM Pools
          </h1>
          <p className="text-base text-primary-content mb-6">
            Lumos is a next-generation application designed to empower liquidity providers (LPs) in DeFi ecosystems by offering advanced tools for optimizing liquidity positions in Concentrated Liquidity Market Maker (CLMM) pools.
          </p>
          <p className="text-base text-primary-content">
            Lumos combines automated liquidity management, impermanent loss (IL) calculations, and pool simulations to provide LPs with actionable insights and tools to maximize their returns while minimizing risk.
          </p>
        </section>

        <h2 className="text-2xl font-bold text-accent mb-6">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-blue-900 shadow-lg rounded-lg p-6 flex flex-col border border-white"
            >
              <h3 className="text-xl font-semibold text-accent-content mb-4">
                {feature.title}
              </h3>
              <ul className="list-disc list-inside text-primary-content space-y-2">
                {feature.items.map((item, idx) => (
                  <li key={idx}>
                    <strong>{item.name}:</strong> {item.description}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}