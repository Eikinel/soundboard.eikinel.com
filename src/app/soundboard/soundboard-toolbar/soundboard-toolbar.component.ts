import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Tool } from "../../models/tool.model";

@Component({
    selector: 'app-soundboard-toolbar',
    templateUrl: './soundboard-toolbar.component.html',
    styleUrls: ['./soundboard-toolbar.component.scss'],
})
export class SoundboardToolbarComponent implements OnInit {
    public tools: { [toolKey: string]: Tool } = {};

    private _useAudioCacheKey: string = 'useAudioCache';

    public ngOnInit(): void {
        const useAudioCache: boolean = Boolean(JSON.parse(localStorage.getItem(this._useAudioCacheKey) || 'true'));

        this.tools = {
            [this._useAudioCacheKey]: {
                label: `Click to play audio ${useAudioCache ? 'multiple times' : 'once' }`,
                onClick: () => this._toggleUseCache()
            }
        };
    }

    public getToolByToolKey(toolKeyToFind: string): Tool | undefined {
        const foundToolPair: [string, Tool] | undefined = Object.entries(this.tools).find((value: [string, Tool]) => {
            const [toolKey, _]: [string, Tool] = value;
            if (toolKeyToFind === toolKey) return true;
        });

        if (foundToolPair) return foundToolPair[1];
    }

    private _toggleUseCache(): void {
        const useAudioCache: boolean = !Boolean(JSON.parse(localStorage.getItem(this._useAudioCacheKey) || 'false'));

        localStorage.setItem(this._useAudioCacheKey, useAudioCache.toString());
        this.getToolByToolKey(this._useAudioCacheKey).label = `Click to play audio ${useAudioCache ? 'multiple times' : 'once' }`;
    }
}