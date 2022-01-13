SOLANA_URL="$1"
NN="$2"
DELAY="$3"
CONTRACT="$4"
# sleep "$DELAY"
DD=$NN""$(date +%d%m%Y%H%M%S)
echo "$NN $DD $CONTRACT $SOLANA_URL"
curl -w '\n' -X POST -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","id":1, "method":"getHealth"}' "$SOLANA_URL"
OUTPUT=$(docker run --rm neonlabsorg/evm_loader:v0.5.3 neon-cli --url "$SOLANA_URL" --evm_loader eeLSJgWzzxrqKv1UxtRVVH8FX3qCQWUs9QuAjJpETGU update-valids-table "$CONTRACT" 2>&1 | tr '\n' ' ')
echo "$NN $DD $CONTRACT $SOLANA_URL RESULT: $OUTPUT"
