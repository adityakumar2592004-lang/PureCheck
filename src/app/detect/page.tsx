'use client';

import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { analyzeFoodImage } from './actions';
import type { ImageBasedAdulterationDetectionOutput } from '@/ai/flows/image-based-adulteration-detection';
import { Upload, FileCheck2, AlertTriangle, Loader, Microscope, FlaskConical, ShieldCheck, ChevronsRight, CheckCircle, XCircle } from 'lucide-react';

export default function ImageDetectionPage() {
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<ImageBasedAdulterationDetectionOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const { toast } = useToast();

    const handleFileChange = (selectedFile: File | null) => {
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile);
            setResult(null);
            setError(null);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            toast({
                title: 'Invalid File',
                description: 'Please select a valid image file (JPEG, PNG, etc.).',
                variant: 'destructive',
            });
        }
    };

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
            handleFileChange(droppedFile);
        }
    };

    const handleSubmit = async () => {
        if (!file || !previewUrl) {
            toast({ title: 'No Image Selected', description: 'Please select an image to analyze.', variant: 'destructive' });
            return;
        }
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const analysisResult = await analyzeFoodImage(previewUrl);
            setResult(analysisResult);
        } catch (e: any) {
            setError(e.message || 'An unknown error occurred.');
            toast({ title: 'Analysis Failed', description: e.message, variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };
    
    const getSafetyBadgeVariant = (rating: string): "default" | "destructive" | "secondary" => {
        switch (rating?.toLowerCase()) {
            case 'safe':
            case 'likely safe':
                return 'default';
            case 'use caution':
            case 'warning':
                return 'secondary';
            case 'unsafe':
            case 'high risk':
                return 'destructive';
            default:
                return 'secondary';
        }
    };

    const renderResultStatus = () => {
        if (!result) return null;

        if (result.isAdulterated) {
            return (
                <div className="p-4 rounded-lg bg-destructive/10 text-destructive flex items-center gap-4">
                    <XCircle className="w-12 h-12 flex-shrink-0" />
                    <div>
                        <p className="font-bold text-xl">Adulteration Detected</p>
                        <p className="text-sm">This food item shows signs of adulteration.</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="p-4 rounded-lg bg-green-600/10 text-green-700 dark:text-green-400 flex items-center gap-4">
                <CheckCircle className="w-12 h-12 flex-shrink-0" />
                <div>
                    <p className="font-bold text-xl">Likely Pure</p>
                    <p className="text-sm">No significant adulterants were detected.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 md:px-6">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold font-headline text-primary">AI Adulteration Scanner</h1>
                <p className="mt-2 text-lg text-muted-foreground max-w-3xl mx-auto">Upload an image of a food item for an instant AI-powered analysis.</p>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>1. Upload Food Image</CardTitle>
                        <CardDescription>Select or drag & drop a clear photo of the food item.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div
                            className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'border-border'}`}
                            onDragEnter={onDragEnter}
                            onDragLeave={onDragLeave}
                            onDragOver={onDragOver}
                            onDrop={onDrop}
                            onClick={() => document.getElementById('file-upload')?.click()}
                        >
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                            />
                            {previewUrl ? (
                                <Image src={previewUrl} alt="Preview" width={400} height={300} className="mx-auto rounded-md max-h-64 object-contain" />
                            ) : (
                                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                    <Upload className="w-10 h-10" />
                                    <p className="font-semibold">Click to upload or drag and drop</p>
                                    <p className="text-sm">PNG, JPG, or WEBP</p>
                                </div>
                            )}
                        </div>
                        <Button onClick={handleSubmit} disabled={!file || loading} className="w-full">
                            {loading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : <Microscope className="mr-2 h-4 w-4" />}
                            {loading ? 'Analyzing...' : 'Analyze Image'}
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>2. Analysis Results</CardTitle>
                        <CardDescription>AI-generated report on potential adulteration.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {loading && (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4 py-10">
                                <Loader className="w-12 h-12 animate-spin text-primary" />
                                <p className="font-semibold">Analyzing image...</p>
                                <p className="text-sm text-center">Our AI is inspecting the food. This may take a moment.</p>
                            </div>
                        )}
                        {error && !loading && (
                            <div className="flex flex-col items-center justify-center h-full text-destructive space-y-4 py-10">
                                <AlertTriangle className="w-12 h-12" />
                                <p className="font-semibold">Analysis Failed</p>
                                <p className="text-sm text-center">{error}</p>
                            </div>
                        )}
                        {result && !loading && (
                            <div className="space-y-6">
                                {renderResultStatus()}

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-primary"/>Safety Rating</h4>
                                        <Badge variant={getSafetyBadgeVariant(result.safetyRating)} className="text-sm">{result.safetyRating || 'N/A'}</Badge>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-semibold">Confidence Score</h4>
                                        <span className="font-bold text-primary">{(result.confidenceScore * 100).toFixed(0)}%</span>
                                    </div>
                                    <Progress value={result.confidenceScore * 100} className="mt-1 h-2" />
                                </div>
                                
                                {result.isAdulterated && (
                                    <>
                                        <div>
                                            <h4 className="font-semibold flex items-center gap-2 mb-2"><FlaskConical className="w-5 h-5 text-primary"/>Possible Adulterants</h4>
                                            {result.possibleAdulterants && result.possibleAdulterants.length > 0 ? (
                                                <ul className="space-y-2">
                                                    {result.possibleAdulterants.map((adulterant, index) => (
                                                        <li key={index} className="flex items-start gap-2">
                                                            <ChevronsRight className="w-4 h-4 mt-1 text-primary flex-shrink-0" />
                                                            <span>{adulterant}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : <p className="text-sm text-muted-foreground">Specific adulterants not identified.</p>}
                                        </div>
                                        <div>
                                            <h4 className="font-semibold flex items-center gap-2 mb-2"><FileCheck2 className="w-5 h-5 text-primary"/>Verification Steps</h4>
                                            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-md">{result.verificationSteps || 'No verification steps provided.'}</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                        {!result && !loading && !error && (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4 py-10">
                                <Microscope className="w-10 h-10 mb-2"/>
                                <p className="text-center font-semibold">Awaiting Analysis</p>
                                <p className="text-center text-sm">Upload an image and click "Analyze" to see the results here.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
