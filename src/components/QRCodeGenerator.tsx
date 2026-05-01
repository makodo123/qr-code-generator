import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode, Link as LinkIcon } from 'lucide-react';

export default function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrImageUrl, setQrImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    generateQR();
  }, [text]);

  const generateQR = async () => {
    if (!text) {
      setQrImageUrl('');
      setError('');
      return;
    }
    try {
      const url = await QRCode.toDataURL(text, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1a1a1a',
          light: '#ffffff',
        },
      });
      setQrImageUrl(url);
      setError('');
    } catch {
      setQrImageUrl('');
      setError('Failed to generate QR code. Please try again.');
    }
  };

  const handleDownload = () => {
    if (!qrImageUrl) return;
    const a = document.createElement('a');
    a.href = qrImageUrl;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4 font-sans text-[#1a1a1a]">
      <div className="bg-white rounded-[24px] shadow-[0_2px_8px_rgba(0,0,0,0.04)] w-full max-w-md p-8 pt-10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#f5f5f5] p-3 rounded-full mb-4">
            <QrCode className="w-8 h-8 text-[#1a1a1a]" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">QR Code Generator</h1>
          <p className="text-[#9e9e9e] text-sm mt-2 text-center">
            Enter a URL or text to instantly generate a QR code.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label htmlFor="qr-input" className="sr-only">
              URL or text
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <LinkIcon className="h-5 w-5 text-[#9e9e9e]" />
              </div>
              <input
                id="qr-input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://example.com"
                className="block w-full pl-11 pr-4 py-3.5 border border-[#e5e5e5] rounded-[16px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent transition-all placeholder:text-[#9e9e9e]"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {qrImageUrl ? (
            <div className="flex flex-col items-center space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-2 border border-[#e5e5e5] rounded-[16px] bg-white">
                <img src={qrImageUrl} alt="Generated QR Code" className="w-[200px] h-[200px] rounded-[8px]" />
              </div>
              <button
                onClick={handleDownload}
                aria-label="Download QR code as PNG"
                className="w-full flex items-center justify-center space-x-2 bg-[#1a1a1a] hover:bg-[#333333] text-white py-3.5 rounded-[16px] transition-colors font-medium text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download QR Code</span>
              </button>
            </div>
          ) : (
            !error && (
              <div className="flex flex-col items-center justify-center space-y-4 py-8 border-2 border-dashed border-[#e5e5e5] rounded-[16px] bg-[#fafafa]">
                <div className="text-[#9e9e9e]">
                  <QrCode className="w-12 h-12 opacity-20" />
                </div>
                <p className="text-[#9e9e9e] text-sm font-medium">Waiting for input...</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
