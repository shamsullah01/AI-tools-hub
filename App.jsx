import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, ExternalLink, Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { aiTools, categories, pricingFilters } from './data/tools';
import logoImage from './assets/ai_tools_hub_logo.png';
import heroBackground from './assets/hero_background.png';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPricing, setSelectedPricing] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Filter tools based on search term, category, and pricing
  const filteredTools = useMemo(() => {
    return aiTools.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           tool.features.some(feature => feature.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
      const matchesPricing = selectedPricing === 'All' || tool.pricing === selectedPricing;
      
      return matchesSearch && matchesCategory && matchesPricing;
    });
  }, [searchTerm, selectedCategory, selectedPricing]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const getPricingColor = (pricing) => {
    switch (pricing) {
      case 'Free': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'Freemium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Paid': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img src={logoImage} alt="AI Tools Hub" className="h-10 w-auto" />
              <span className="hidden sm:block text-xl font-bold text-primary">AI Tools Hub</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#home" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
              <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors">Categories</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">About</a>
              <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
            </nav>

            {/* Dark Mode Toggle & Mobile Menu */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="h-9 w-9"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden h-9 w-9"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t py-4">
              <nav className="flex flex-col space-y-2">
                <a href="#home" className="text-sm font-medium hover:text-primary transition-colors py-2">Home</a>
                <a href="#categories" className="text-sm font-medium hover:text-primary transition-colors py-2">Categories</a>
                <a href="#about" className="text-sm font-medium hover:text-primary transition-colors py-2">About</a>
                <a href="#contact" className="text-sm font-medium hover:text-primary transition-colors py-2">Contact</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section 
        className="relative py-20 px-4 sm:px-6 lg:px-8 hero-gradient text-white"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Discover the Best AI Tools
            <br />
            <span className="text-accent-foreground">for Every Need</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            Explore our curated collection of cutting-edge AI tools to boost your productivity, 
            creativity, and innovation. Find the perfect AI solution for your projects.
          </p>
          
          {/* Hero Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for AI tools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-4 text-lg bg-white/90 backdrop-blur border-0 search-glow"
            />
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
            {/* Category Filter */}
            <div className="flex-1">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="text-xs"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Pricing Filter */}
            <div className="lg:w-64">
              <h3 className="text-sm font-medium mb-3 text-muted-foreground">Pricing</h3>
              <div className="flex flex-wrap gap-2">
                {pricingFilters.map((pricing) => (
                  <Button
                    key={pricing}
                    variant={selectedPricing === pricing ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPricing(pricing)}
                    className="text-xs"
                  >
                    {pricing}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">
              {selectedCategory === 'All' ? 'All AI Tools' : selectedCategory}
            </h2>
            <p className="text-muted-foreground">
              {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-4">No tools found matching your criteria</p>
              <Button onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedPricing('All');
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Card key={tool.id} className="tool-card h-full flex flex-col">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{tool.name}</CardTitle>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={getPricingColor(tool.pricing)}>
                            {tool.pricing}
                          </Badge>
                          <Badge variant="outline" className="category-badge text-white border-0">
                            {tool.category}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        {tool.rating}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 flex flex-col">
                    <CardDescription className="mb-4 flex-1">
                      {tool.description}
                    </CardDescription>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {tool.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {tool.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{tool.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <Button asChild className="w-full mt-auto">
                      <a href={tool.url} target="_blank" rel="noopener noreferrer">
                        Visit Tool
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={logoImage} alt="AI Tools Hub" className="h-8 w-auto" />
                <span className="text-lg font-bold">AI Tools Hub</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Your go-to destination for discovering the best AI tools to enhance your productivity and creativity.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">AI Assistants</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Image Generation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Writing Tools</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Video Creation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 AI Tools Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

