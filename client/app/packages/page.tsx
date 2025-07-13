"use client";

import { useEffect, useState } from "react";
import PackageCard from "@/components/package-card";
import ContactForm from "@/components/contact-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { Package } from "@/lib/interface";

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const router = useRouter();

  const [packages, setPackages] = useState<Package[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const packagesPerPage = 6;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/packages");
        setPackages(response.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    fetchPackages();
  }, []);

  const handlePackageClick = (id: string) => {
    router.push(`/packages/${id}`);
  };

  const filteredPackages = packages.filter((pkg) => {
    // Search filter
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.location.toLowerCase().includes(searchTerm.toLowerCase());

    // Price filter
    let matchesPrice = true;
    if (priceFilter === "budget") {
      matchesPrice = pkg.price < 30000;
    } else if (priceFilter === "mid") {
      matchesPrice = pkg.price >= 30000 && pkg.price < 45000;
    } else if (priceFilter === "luxury") {
      matchesPrice = pkg.price >= 45000;
    }

    // Duration filter
    let matchesDuration = true;
    if (durationFilter === "short") {
      matchesDuration = Number.parseInt(pkg.duration.split(" ")[0]) <= 5;
    } else if (durationFilter === "medium") {
      const days = Number.parseInt(pkg.duration.split(" ")[0]);
      matchesDuration = days > 5 && days <= 7;
    } else if (durationFilter === "long") {
      matchesDuration = Number.parseInt(pkg.duration.split(" ")[0]) > 7;
    }

    return matchesSearch && matchesPrice && matchesDuration;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredPackages.length / packagesPerPage);
  const indexOfLastPackage = currentPage * packagesPerPage;
  const indexOfFirstPackage = indexOfLastPackage - packagesPerPage;
  const currentPackages = filteredPackages.slice(indexOfFirstPackage, indexOfLastPackage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <section className="py-20 md:py-28 lg:py-32 bg-gradient-to-br from-red-50 via-white to-orange-50">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              India Travel Packages
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">
              Expertly crafted itineraries to explore the diverse beauty and
              culture of Incredible India
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Desktop sidebar - hidden on mobile */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-2xl border border-gray-100 p-6 bg-gradient-to-br from-white to-gray-50">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Search & Filter</h2>

                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                    <Input
                      type="text"
                      placeholder="Search destinations..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="font-medium mb-2 block text-gray-900">
                        Price Range
                      </label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(e.target.value)}
                      >
                        <option value="all">All Prices</option>
                        <option value="budget">Budget (Under ₹30,000)</option>
                        <option value="mid">
                          Mid-Range (₹30,000 - ₹45,000)
                        </option>
                        <option value="luxury">Luxury (Over ₹45,000)</option>
                      </select>
                    </div>

                    <div>
                      <label className="font-medium mb-2 block text-gray-900">Duration</label>
                      <select
                        className="w-full rounded-md border border-input bg-background px-3 py-2"
                        value={durationFilter}
                        onChange={(e) => setDurationFilter(e.target.value)}
                      >
                        <option value="all">All Durations</option>
                        <option value="short">Short (5 days or less)</option>
                        <option value="medium">Medium (6-7 days)</option>
                        <option value="long">Long (8+ days)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-gray-100 p-6 bg-gradient-to-br from-white to-gray-50">
                  <h2 className="text-xl font-bold mb-4 text-gray-900">Contact Us</h2>
                  <p className="text-gray-600 mb-6">
                    Have questions about our packages? Fill out the form below
                    and our travel experts will get back to you.
                  </p>
                  <ContactForm source="Packages Page" />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              {/* Mobile search bar */}
              <div className="mb-4 lg:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
                  <Input
                    type="text"
                    placeholder="Search destinations..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {filteredPackages.length > 0 ? (
                <>
                  <div className="grid gap-6 sm:grid-cols-2">
                    {currentPackages.map((pkg) => (
                      <PackageCard
                        key={pkg._id}
                        id={pkg._id}
                        name={pkg.name}
                        image={pkg.images[0]}
                        duration={pkg.duration}
                        description={pkg.description}
                        price={pkg.price}
                        onClick={() => handlePackageClick(pkg._id)}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-8 flex justify-center items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Button
                          key={pageNum}
                          variant={pageNum === currentPage ? "default" : "outline"}
                          className={pageNum === currentPage ? "bg-gradient-to-r from-red-600 to-orange-600" : ""}
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      ))}
                      
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Filter className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900">No packages found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setPriceFilter("all");
                      setDurationFilter("all");
                    }}
                    className="bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700"
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFilterDrawerOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-medium mb-2 block text-gray-900">Price Range</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (Under ₹30,000)</option>
                  <option value="mid">Mid-Range (₹30,000 - ₹45,000)</option>
                  <option value="luxury">Luxury (Over ₹45,000)</option>
                </select>
              </div>

              <div>
                <label className="font-medium mb-2 block text-gray-900">Duration</label>
                <select
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={durationFilter}
                  onChange={(e) => setDurationFilter(e.target.value)}
                >
                  <option value="all">All Durations</option>
                  <option value="short">Short (5 days or less)</option>
                  <option value="medium">Medium (6-7 days)</option>
                  <option value="long">Long (8+ days)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <Button
                variant="outline"
                className="flex-1 border-red-600 text-red-600 hover:bg-red-50"
                onClick={() => {
                  setPriceFilter("all");
                  setDurationFilter("all");
                }}
              >
                Reset
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700"
                onClick={() => setIsFilterDrawerOpen(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile bottom navbar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t py-3 px-4 flex justify-center lg:hidden z-40">
        <Button
          onClick={() => setIsFilterDrawerOpen(true)}
          className="bg-gradient-to-r from-red-600 to-orange-600 text-white hover:from-red-700 hover:to-orange-700 flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filter</span>
          {(priceFilter !== "all" || durationFilter !== "all") && (
            <span className="bg-white text-red-600 rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {(priceFilter !== "all" ? 1 : 0) +
                (durationFilter !== "all" ? 1 : 0)}
            </span>
          )}
        </Button>
      </div>
    </>
  );
}
