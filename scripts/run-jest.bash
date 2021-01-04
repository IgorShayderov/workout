set -e

cd "${0%/*}/.."

echo "Running js tests"
bundle exec jest