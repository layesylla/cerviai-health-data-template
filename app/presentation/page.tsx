"use client"

import { useState } from "react"
import { Globe2, Users, MessageSquare, BarChart3, Shield, Zap } from "lucide-react"

export default function PresentationPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">CERVIAI</h1>
          <p className="text-2xl text-cyan-400">
            Autonomiser les femmes par le dépistage précoce et l'intelligence artificielle
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {[
            { id: "overview", label: "Vue d'ensemble" },
            { id: "features", label: "Fonctionnalités" },
            { id: "mockups", label: "Interfaces" },
            { id: "roles", label: "Rôles & Permissions" },
            { id: "tech", label: "Architecture" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeTab === tab.id ? "bg-cyan-500 text-white" : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-slate-800 rounded-xl p-8 border border-cyan-500/20">
              <h2 className="text-3xl font-bold mb-4 text-cyan-400">À propos</h2>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">✓</span>
                  <span>Plateforme de dépistage du cancer du col de l'utérus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">✓</span>
                  <span>Utilise l'IA pour analyser les résultats</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">✓</span>
                  <span>Géolocalisation des structures de santé</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">✓</span>
                  <span>Messagerie bidirectionnelle en temps réel</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">✓</span>
                  <span>Dashboard analytique complet</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-cyan-500/20 to-pink-500/20 rounded-xl p-8 border border-cyan-500/30">
              <h2 className="text-3xl font-bold mb-4 text-pink-400">Impact</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-cyan-500/20">
                  <div className="text-3xl font-bold text-cyan-400">500+</div>
                  <div className="text-sm text-slate-400">Patientes</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-pink-500/20">
                  <div className="text-3xl font-bold text-pink-400">50+</div>
                  <div className="text-sm text-slate-400">Agents/Médecins</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-cyan-500/20">
                  <div className="text-3xl font-bold text-cyan-400">12</div>
                  <div className="text-sm text-slate-400">Structures</div>
                </div>
                <div className="bg-slate-800 rounded-lg p-4 text-center border border-pink-500/20">
                  <div className="text-3xl font-bold text-pink-400">98%</div>
                  <div className="text-sm text-slate-400">Précision IA</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === "features" && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Users, title: "Gestion des Patientes", desc: "Collecte et suivi des données de dépistage" },
              { icon: BarChart3, title: "Analyse IA", desc: "Calcul du risque automatisé et recommandations" },
              { icon: Globe2, title: "Géolocalisation", desc: "Visualisation des structures sur carte" },
              { icon: MessageSquare, title: "Messagerie", desc: "Communication directe patientes-agents" },
              { icon: Shield, title: "Sécurité", desc: "Anonymisation et contrôle d'accès" },
              { icon: Zap, title: "Notifications", desc: "SMS et alertes en temps réel" },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-800 rounded-lg p-6 border border-cyan-500/20 hover:border-cyan-400/50 transition-all"
              >
                <feature.icon className="w-10 h-10 text-cyan-400 mb-3" />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mockups Tab */}
        {activeTab === "mockups" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Desktop</h3>
              <div className="bg-slate-900 rounded-lg p-4 border-2 border-slate-700 min-h-80">
                <div className="text-slate-500 text-center py-16">
                  <div className="text-6xl mb-2">💻</div>
                  <p>Interface complète avec navigation latérale</p>
                  <p className="text-sm mt-2">Dashboard, Patientes, Structures, Analyses, Messagerie</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-pink-500/20">
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Mobile</h3>
              <div className="bg-slate-900 rounded-lg p-4 border-2 border-slate-700 min-h-80">
                <div className="text-slate-500 text-center py-16">
                  <div className="text-6xl mb-2">📱</div>
                  <p>Interface adaptée pour smartphones</p>
                  <p className="text-sm mt-2">Menu burger, notifications, messagerie optimisée</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === "roles" && (
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                role: "Patiente",
                perms: ["Consulter structures", "Envoyer messages", "Voir résultats IA", "Recevoir SMS"],
              },
              {
                role: "Agent de Santé",
                perms: ["Collecter données", "Accéder patientes", "Messagerie", "Voir analyses"],
              },
              {
                role: "Médecin",
                perms: ["Scorer patients", "Accéder données", "Messagerie", "Voir alertes"],
              },
              {
                role: "Admin",
                perms: ["Gérer users", "Gérer structures", "SMS", "Statistiques globales"],
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-xl font-bold mb-4 text-cyan-400">{item.role}</h3>
                <ul className="space-y-2 text-sm">
                  {item.perms.map((perm, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-pink-400 mt-1">→</span>
                      <span className="text-slate-300">{perm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Tech Tab */}
        {activeTab === "tech" && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-800 rounded-xl p-8 border border-cyan-500/20">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Frontend</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Next.js 14+ (App Router)</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-400">•</span>
                  <span>React 18+ avec Hooks</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Tailwind CSS v4</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-400">•</span>
                  <span>TypeScript strict</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-pink-400">•</span>
                  <span>Recharts (visualisations)</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800 rounded-xl p-8 border border-pink-500/20">
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Backend & Services</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>Context API pour état global</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>localStorage pour persistance</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>Algorithme IA de scoring</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>Système de messagerie temps réel</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">•</span>
                  <span>Gestion SMS & notifications</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
