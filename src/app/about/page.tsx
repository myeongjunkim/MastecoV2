import HeroSection from "@/components/ui/HeroSection";
import ContentSection from "@/components/ui/ContentSection";
import { FaShieldAlt, FaAward, FaUsers, FaGlobeAsia } from "react-icons/fa";

export default function AboutPage() {
  return (
    <>
      <HeroSection
        title="About MASTECO"
        subtitle="Protecting lives and properties since 1982"
        backgroundImage="/images/about-hero.jpg"
      />

      <ContentSection title="Our Company" background="light">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="mb-4 text-lg">
              Since 1982, MASTECO has been operating based on the principle of
              offering what is best for customers to protect their lives and
              valuable properties from the danger of fire.
            </p>
            <p className="mb-4">
              MASTECO designs, produces and tests all the products in our own
              facilities in accordance with the strict industrial standards and
              they are tested and approved by national and international testing
              laboratories and approval agencies.
            </p>
            <p>
              MASTECO&apos;s optimally-engineered and trusted water-based and
              gaseous fire extinguishing equipment and systems using DuPont
              FM-200(HFC-227ea) are chosen by the global companies for their
              fire protection systems, and MASTECO is working hard with its
              highly experienced and dedicated distributors to customer service
              and technical support in the international markets and the
              world-renowned construction and engineering companies for various
              fire protection applications in many industrial areas.
            </p>
          </div>
          <div
            className="h-[400px] bg-cover bg-center rounded-lg shadow-lg"
            style={{ backgroundImage: "url('/images/company-image.jpg')" }}
          />
        </div>
      </ContentSection>

      <ContentSection
        title="Our Core Values"
        subtitle="These principles guide everything we do"
        background="white"
        centered
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <FaShieldAlt className="mx-auto text-5xl text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Safety</h3>
            <p>
              We prioritize safety in all our products and services, ensuring
              reliable protection when it matters most.
            </p>
          </div>
          <div className="text-center p-6">
            <FaAward className="mx-auto text-5xl text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Quality</h3>
            <p>
              We maintain the highest standards of quality in our products,
              processes, and customer interactions.
            </p>
          </div>
          <div className="text-center p-6">
            <FaUsers className="mx-auto text-5xl text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Customer Focus</h3>
            <p>
              We put our customers at the center of everything we do, striving
              to exceed their expectations.
            </p>
          </div>
          <div className="text-center p-6">
            <FaGlobeAsia className="mx-auto text-5xl text-blue-600 mb-4" />
            <h3 className="text-xl font-bold mb-2">Global Reach</h3>
            <p>
              We serve customers around the world, providing localized support
              with global expertise.
            </p>
          </div>
        </div>
      </ContentSection>

      <ContentSection title="Our History" background="dark">
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-2 text-center">
              <div className="inline-block bg-blue-800 rounded-full p-4 w-16 h-16 flex items-center justify-center text-xl font-bold">
                1982
              </div>
            </div>
            <div className="md:col-span-10">
              <h3 className="text-xl font-bold mb-2">Company Founded</h3>
              <p>
                MASTECO was established with the mission to protect lives and
                properties from fire hazards.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-2 text-center">
              <div className="inline-block bg-blue-800 rounded-full p-4 w-16 h-16 flex items-center justify-center text-xl font-bold">
                1990
              </div>
            </div>
            <div className="md:col-span-10">
              <h3 className="text-xl font-bold mb-2">
                International Expansion
              </h3>
              <p>
                MASTECO began expanding its operations to international markets,
                starting with Southeast Asia.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-2 text-center">
              <div className="inline-block bg-blue-800 rounded-full p-4 w-16 h-16 flex items-center justify-center text-xl font-bold">
                2000
              </div>
            </div>
            <div className="md:col-span-10">
              <h3 className="text-xl font-bold mb-2">Product Innovation</h3>
              <p>
                Introduction of new fire protection technologies and systems
                including the FM-200 gaseous systems.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-2 text-center">
              <div className="inline-block bg-blue-800 rounded-full p-4 w-16 h-16 flex items-center justify-center text-xl font-bold">
                2010
              </div>
            </div>
            <div className="md:col-span-10">
              <h3 className="text-xl font-bold mb-2">Industry Leadership</h3>
              <p>
                MASTECO established itself as a leader in the fire protection
                industry with certifications and awards.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-2 text-center">
              <div className="inline-block bg-blue-800 rounded-full p-4 w-16 h-16 flex items-center justify-center text-xl font-bold">
                2023
              </div>
            </div>
            <div className="md:col-span-10">
              <h3 className="text-xl font-bold mb-2">Continued Growth</h3>
              <p>
                MASTECO continues to grow globally, with new products and
                services to meet evolving fire protection needs.
              </p>
            </div>
          </div>
        </div>
      </ContentSection>
    </>
  );
}
