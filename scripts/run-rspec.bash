set -e

cd "${0%/*}/.."

echo "Running ruby tests"
bundle exec rspec