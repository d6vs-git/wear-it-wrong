export default function FontDemo() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-4xl font-bold">Font Demo</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-semibold mb-2">ATB Serif</h2>
          <p className="text-lg font-atbserif">
            The quick brown fox jumps over the lazy dog. This is ATB Serif font.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">BadTyp</h2>
          <p className="text-lg font-badtyp">
            The quick brown fox jumps over the lazy dog. This is BadTyp font.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Dogma Outline</h2>
          <p className="text-lg font-dogmaoutline">
            The quick brown fox jumps over the lazy dog. This is Dogma Outline font.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Default Sans (Inter)</h2>
          <p className="text-lg font-sans">
            The quick brown fox jumps over the lazy dog. This is the default sans font.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Default Serif (Lora)</h2>
          <p className="text-lg font-serif">
            The quick brown fox jumps over the lazy dog. This is the default serif font.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Default Mono (Fira Mono)</h2>
          <p className="text-lg font-mono">
            The quick brown fox jumps over the lazy dog. This is the default mono font.
          </p>
        </div>
      </div>
    </div>
  );
}