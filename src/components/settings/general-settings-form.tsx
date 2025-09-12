
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type GeneralSettingsFormProps = {
    onSave: (values: { currency: string, locale: string }) => void;
};

export function GeneralSettingsForm({ onSave }: GeneralSettingsFormProps) {
    const [currency, setCurrency] = useState('BRL');
    const [locale, setLocale] = useState('pt-BR');
    const [hasChanges, setHasChanges] = useState(false);

    const handleCurrencyChange = (value: string) => {
        setCurrency(value);
        setHasChanges(true);
    };

    const handleLocaleChange = (value: string) => {
        setLocale(value);
        setHasChanges(true);
    };

    const handleSaveChanges = () => {
        onSave({ currency, locale });
        setHasChanges(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Preferências Gerais</CardTitle>
                <CardDescription>Gerencie suas preferências de moeda e idioma.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="currency">Moeda Padrão</Label>
                        <Select value={currency} onValueChange={handleCurrencyChange}>
                            <SelectTrigger id="currency">
                                <SelectValue placeholder="Selecione a moeda" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BRL">Real (BRL)</SelectItem>
                                <SelectItem value="USD">Dólar (USD)</SelectItem>
                                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="locale">Idioma e Região</Label>
                        <Select value={locale} onValueChange={handleLocaleChange}>
                            <SelectTrigger id="locale">
                                <SelectValue placeholder="Selecione o idioma" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                                <SelectItem value="en-US">Inglês (EUA)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                 <div className="mt-6 flex justify-end">
                    <Button onClick={handleSaveChanges} disabled={!hasChanges}>
                        Salvar Alterações
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
