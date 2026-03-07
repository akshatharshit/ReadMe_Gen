export default function Footer() {
    return (
        <footer className="w-full py-2 px-4 border-t border-cli-gray text-center bg-cli-bg z-10">
            <p className="text-xs text-cli-gray-light">
                <span className="text-cli-amber">system_uptime:</span> online | <span className="text-cli-cyan">mode:</span> strict | <span className="text-cli-green">status:</span> nominal
            </p>
        </footer>
    );
}
