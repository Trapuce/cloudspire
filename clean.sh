#!/bin/bash

# Script de nettoyage pour CloudSpire

echo "🧹 Nettoyage de CloudSpire"
echo "=========================="

# Arrêter et supprimer les conteneurs
echo "🛑 Arrêt des conteneurs..."
docker-compose down

# Supprimer les volumes (ATTENTION: supprime les données)
read -p "⚠️  Supprimer les volumes et données ? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🗑️  Suppression des volumes..."
    docker-compose down -v
fi

# Nettoyer les images non utilisées
echo "🧽 Nettoyage des images Docker..."
docker image prune -f

# Nettoyer le cache Docker
echo "🧽 Nettoyage du cache Docker..."
docker builder prune -f

echo "✅ Nettoyage terminé !"
echo ""
echo "Pour redémarrer CloudSpire:"
echo "  ./start.sh"
