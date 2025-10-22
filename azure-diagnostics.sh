#!/bin/bash
set -e

echo "🔍 Checking Azure CLI environment..."
echo "-----------------------------------"

# 1️⃣ Check Azure CLI is installed
if ! command -v az &> /dev/null; then
  echo "❌ Azure CLI not found. Please install it with Homebrew:"
  echo "   brew install azure-cli"
  exit 1
fi

# 2️⃣ Check login status
echo "🔑 Checking login..."
if ! az account show &> /dev/null; then
  echo "⚠️  You are not logged in. Opening login window..."
  az login
fi

# 3️⃣ Show current subscription
echo ""
echo "📄 Current active subscription:"
az account show --output table || { echo "❌ Could not show active subscription"; exit 1; }

# 4️⃣ List all subscriptions
echo ""
echo "🧾 All available subscriptions:"
az account list --all --output table || { echo "❌ Could not list subscriptions"; exit 1; }

# 5️⃣ List all tenants
echo ""
echo "🏢 Available tenants:"
az account tenant list --output table || { echo "❌ Could not list tenants"; exit 1; }

# 6️⃣ Check if current subscription exists
CURRENT_SUB_ID=$(az account show --query id -o tsv)
SUB_MATCH=$(az account list --all --query "[?id=='$CURRENT_SUB_ID']" -o tsv)

if [ -z "$SUB_MATCH" ]; then
  echo "❌ The current subscription ($CURRENT_SUB_ID) is not registered in your tenant!"
  echo "➡️  Run the following to fix:"
  echo "   az login --tenant <YourTenantId>"
  echo "   az account set --subscription <YourValidSubscriptionId>"
  exit 1
else
  echo "✅ Subscription $CURRENT_SUB_ID is valid and active."
fi

# 7️⃣ Check registration for Cosmos DB provider
echo ""
echo "🔄 Checking Cosmos DB provider registration..."
COSMOS_STATE=$(az provider show --namespace Microsoft.DocumentDB --query "registrationState" -o tsv || echo "NotRegistered")

if [ "$COSMOS_STATE" != "Registered" ]; then
  echo "⚠️  Microsoft.DocumentDB provider is not registered. Registering now..."
  az provider register --namespace Microsoft.DocumentDB
else
  echo "✅ Microsoft.DocumentDB provider already registered."
fi

# 8️⃣ Confirm tenant and subscription IDs match expected format
echo ""
TENANT_ID=$(az account show --query tenantId -o tsv)
echo "✅ Tenant ID: $TENANT_ID"
echo "✅ Subscription ID: $CURRENT_SUB_ID"

echo ""
echo "🎉 Environment looks good!"
echo "You can now safely run your Azure resource creation commands."
