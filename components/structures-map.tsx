"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Structure } from "@/lib/structures-context"
import { MapPin, Building2 } from "lucide-react"
import { useState } from "react"

interface StructuresMapProps {
  structures: Structure[]
}

export function StructuresMap({ structures }: StructuresMapProps) {
  const [selectedStructure, setSelectedStructure] = useState<Structure | null>(null)

  // Calculate map bounds
  const lats = structures.map((s) => s.latitude)
  const lngs = structures.map((s) => s.longitude)
  const minLat = Math.min(...lats)
  const maxLat = Math.max(...lats)
  const minLng = Math.min(...lngs)
  const maxLng = Math.max(...lngs)

  // SVG viewBox dimensions
  const padding = 0.5
  const viewBox = `${minLng - padding} ${minLat - padding} ${maxLng - minLng + padding * 2} ${maxLat - minLat + padding * 2}`

  const getMarkerColor = (structure: Structure) => {
    if (structure.nombreDepistages > 100) return "#0EA5E9" // primary
    if (structure.nombreDepistages > 50) return "#EC4899" // secondary
    return "#10B981" // success
  }

  const getMarkerSize = (structure: Structure) => {
    if (structure.nombreDepistages > 100) return 0.15
    if (structure.nombreDepistages > 50) return 0.12
    return 0.1
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {/* Map */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Carte des Structures de Santé
          </CardTitle>
          <CardDescription>Cliquez sur un marqueur pour voir les détails</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl border overflow-hidden">
            <svg viewBox={viewBox} className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="0.5" height="0.5" patternUnits="userSpaceOnUse">
                  <path d="M 0.5 0 L 0 0 0 0.5" fill="none" stroke="currentColor" strokeWidth="0.01" opacity="0.1" />
                </pattern>
              </defs>
              <rect
                x={minLng - padding}
                y={minLat - padding}
                width={maxLng - minLng + padding * 2}
                height={maxLat - minLat + padding * 2}
                fill="url(#grid)"
              />

              {/* Structures markers */}
              {structures.map((structure) => {
                const size = getMarkerSize(structure)
                const isSelected = selectedStructure?.id === structure.id
                return (
                  <g
                    key={structure.id}
                    onClick={() => setSelectedStructure(structure)}
                    className="cursor-pointer transition-transform hover:scale-110"
                    style={{ transformOrigin: `${structure.longitude}px ${structure.latitude}px` }}
                  >
                    {/* Marker shadow */}
                    <circle
                      cx={structure.longitude}
                      cy={structure.latitude}
                      r={size}
                      fill="black"
                      opacity="0.2"
                      transform={`translate(0.02, 0.02)`}
                    />
                    {/* Marker */}
                    <circle
                      cx={structure.longitude}
                      cy={structure.latitude}
                      r={size}
                      fill={getMarkerColor(structure)}
                      stroke="white"
                      strokeWidth="0.02"
                      opacity={isSelected ? 1 : 0.8}
                    />
                    {/* Pulse animation for selected */}
                    {isSelected && (
                      <circle
                        cx={structure.longitude}
                        cy={structure.latitude}
                        r={size}
                        fill="none"
                        stroke={getMarkerColor(structure)}
                        strokeWidth="0.02"
                        opacity="0.6"
                      >
                        <animate attributeName="r" from={size} to={size * 2} dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.6" to="0" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                    )}
                  </g>
                )
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
              <p className="text-xs font-semibold mb-2">Nombre de dépistages</p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span>&gt; 100 dépistages</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-secondary" />
                  <span>50-100 dépistages</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full bg-success" />
                  <span>&lt; 50 dépistages</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Structure Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Détails de la Structure</CardTitle>
          <CardDescription>
            {selectedStructure ? "Informations détaillées" : "Sélectionnez une structure sur la carte"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedStructure ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedStructure.nom}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {selectedStructure.region}, {selectedStructure.departement}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Dépistages</p>
                  <p className="text-2xl font-bold text-primary">{selectedStructure.nombreDepistages}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Agents</p>
                  <p className="text-2xl font-bold text-secondary">{selectedStructure.nombreAgents}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Équipements</p>
                <div className="flex flex-wrap gap-1">
                  {selectedStructure.equipements.map((eq, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {eq}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t">
                <p className="text-sm font-medium">Contact</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>{selectedStructure.adresse}</p>
                  <p>{selectedStructure.telephone}</p>
                  <p>{selectedStructure.email}</p>
                </div>
              </div>

              <div className="space-y-1 pt-2 border-t">
                <p className="text-xs text-muted-foreground">Coordonnées GPS</p>
                <p className="text-xs font-mono">
                  {selectedStructure.latitude.toFixed(4)}, {selectedStructure.longitude.toFixed(4)}
                </p>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <Building2 className="h-12 w-12 mx-auto text-muted-foreground opacity-50 mb-4" />
              <p className="text-sm text-muted-foreground">Cliquez sur un marqueur pour voir les détails</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
