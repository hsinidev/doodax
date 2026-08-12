import React, { useState, useCallback } from 'react';
import SpeedTest from '@cloudflare/speedtest';

type TestStatus = 'idle' | 'running-latency' | 'running-download' | 'running-upload' | 'finished' | 'error';

interface SpeedTestData {
    latency: number | null;
    jitter: number | null;
    downloadSpeed: number | null;
    uploadSpeed: number | null;
}

const ResultDisplay: React.FC<{ value: number | null; label: string; unit: string }> = ({ value, label, unit }) => (
    <div className="text-center p-4 bg-gray-800 rounded-lg w-full md:w-1/4">
        <p className="text-sm text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-4xl md:text-5xl font-bold text-white">
            {value !== null ? value.toFixed(2) : '--'}
        </p>
        <p className="text-cyan-400">{unit}</p>
    </div>
);

const InternetSpeedTest: React.FC = () => {
    const [status, setStatus] = useState<TestStatus>('idle');
    const [results, setResults] = useState<SpeedTestData>({
        latency: null,
        jitter: null,
        downloadSpeed: null,
        uploadSpeed: null,
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const resetState = () => {
        setResults({
            latency: null,
            jitter: null,
            downloadSpeed: null,
            uploadSpeed: null,
        });
        setErrorMessage(null);
    };

    const runTest = useCallback(() => {
        resetState();
        setStatus('running-latency');

        try {
            const speedTest = new SpeedTest({
                autoStart: true,
                measurements: [
                    { type: 'latency', numPackets: 5 },
                    { type: 'download', bytes: 1e7, count: 3 },
                    { type: 'upload', bytes: 5e6, count: 3 },
                ]
            });

            speedTest.onResultsChange = ({ type }: { type: string }) => {
                const results = speedTest.results;
                if (type === 'latency') {
                    const lat = results.getUnloadedLatency();
                    const jit = results.getUnloadedJitter();
                    setResults(prev => ({
                        ...prev,
                        latency: typeof lat === 'number' ? lat : prev.latency,
                        jitter: typeof jit === 'number' ? jit : prev.jitter
                    }));
                }
                if (type === 'download') {
                    setStatus('running-download');
                    const down = results.getDownloadBandwidth();
                    setResults(prev => ({
                        ...prev,
                        downloadSpeed: typeof down === 'number' ? down / 1000000 : prev.downloadSpeed
                    }));
                }
                if (type === 'upload') {
                    setStatus('running-upload');
                    const up = results.getUploadBandwidth();
                    setResults(prev => ({
                        ...prev,
                        uploadSpeed: typeof up === 'number' ? up / 1000000 : prev.uploadSpeed
                    }));
                }
            };

            speedTest.onFinish = (results: any) => {
                setStatus('finished');
                const lat = results.getUnloadedLatency();
                const jit = results.getUnloadedJitter();
                const down = results.getDownloadBandwidth();
                const up = results.getUploadBandwidth();

                setResults({
                    latency: typeof lat === 'number' ? lat : null,
                    jitter: typeof jit === 'number' ? jit : null,
                    downloadSpeed: typeof down === 'number' ? down / 1000000 : null,
                    uploadSpeed: typeof up === 'number' ? up / 1000000 : null,
                });
            };

            speedTest.onError = (error: any) => {
                console.error(error);
                setErrorMessage('An error occurred during the test. Please try again.');
                setStatus('error');
            };

        } catch (e) {
            console.error(e);
            setErrorMessage('An error occurred starting the test. Please try again.');
            setStatus('error');
        }
    }, []);

    const isTestRunning = status.startsWith('running');

    const getStatusText = () => {
        switch (status) {
            case 'running-latency':
                return 'Testing Latency & Jitter...';
            case 'running-download':
                return 'Measuring Download Speed...';
            case 'running-upload':
                return 'Measuring Upload Speed...';
            case 'finished':
                return 'Test Complete!';
            case 'error':
                return 'Test Failed';
            default:
                return 'Ready to start';
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-8 bg-gray-900 bg-opacity-40 rounded-lg border border-gray-700 text-white">
            <h2 className="text-3xl font-bold text-center mb-8">Internet Speed Test</h2>

            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <ResultDisplay value={results.latency} label="Latency" unit="ms" />
                <ResultDisplay value={results.jitter} label="Jitter" unit="ms" />
                <ResultDisplay value={results.downloadSpeed} label="Download" unit="Mbps" />
                <ResultDisplay value={results.uploadSpeed} label="Upload" unit="Mbps" />
            </div>

            <div className="text-center">
                <button
                    onClick={runTest}
                    disabled={isTestRunning}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 px-12 rounded-full transition-all duration-300 text-xl disabled:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {isTestRunning ? 'Testing...' : 'Start Test'}
                </button>
                <p className="mt-4 text-gray-300 h-6">
                    {getStatusText()}
                </p>
                {status === 'error' && (
                    <p className="mt-2 text-red-400">{errorMessage}</p>
                )}
            </div>
        </div>
    );
};

export default InternetSpeedTest;
