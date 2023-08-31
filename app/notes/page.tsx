'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'quill/dist/quill.snow.css';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Root as ScrollArea, Viewport, Scrollbar, Thumb } from '@radix-ui/react-scroll-area';
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [summary, setSummary] = useState<string | null>(null);
  const [references, setReferences] = useState<string[] | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [topics, setTopics] = useState<string[] | null>(null);
  const [menubarHeight, setMenubarHeight] = useState('5vh');
  const [sectionHeights, setSectionHeights] = useState({
    section1: '80vh',
    section2: '10vh'
  });
  const [editorHeight, setEditorHeight] = useState('70vh');

  useEffect(() => {

    setTopics([]);
    import('quill').then((QuillModule) => {
      const Quill = QuillModule.default;
      if (document.querySelector('#editor .ql-toolbar')) return;
      const options = {
        debug: 'info',
        modules: { /* ... */ },
        placeholder: 'Compose an epic...',
        readOnly: false,
        theme: 'snow'
      };
      const quill = new Quill('#editor', options);
      quill.on('text-change', function () {
        const text = quill.getText();
        axios.post('http://localhost:8000/api/edify', { text }, {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(({ data: { summary, references, topics } }) => {
          setSummary(summary);
          setReferences(references);
          setTopics(topics);
        })
        .catch(error => console.error('Error calling the Flask API:', error));
      });
    });
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      setSectionHeights({
        section1: '80vh',
        section2: '10vh'
      });
      setEditorHeight('70vh');  // Update Quill editor's height
    } else {
      setSectionHeights({
        section1: '50vh',
        section2: '40vh'
      });
      setEditorHeight('40vh');  // Update Quill editor's height
    }
  };

  return (
    <div className="h-[95vh] flex flex-col" style={{ paddingTop: menubarHeight }}>
      {/* Section 1 */}
      <div className="flex-grow flex items-center justify-between" style={{ height: sectionHeights.section1 }}>
        <div className="flex w-full justify-center">
          <div className="w-[60%]">
            {/* Update Quill editor's style */}
            <div id="editor" className="bg-gray-50 p-4" style={{ height: editorHeight }}></div>
          </div>
        </div>
        <div className="absolute right-0 top-1/4">
          <Card className="w-[250px]">
            <CardHeader>
              <CardTitle>Expand Text</CardTitle>
              <CardDescription>Use AI to expand your notes in one-click.</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Model</Label>
                    <Select>
                      <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="next">DaVinci</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button>Expand</Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Button to toggle */}
      <div className="bg-white p-2 flex justify-center items-center" style={{ height: '5%' }}>
        <button className="rounded-full p-2" onClick={toggleExpand}>
          <span role="img" aria-label="arrow">{isExpanded ? '▼' : '▲'}</span>
        </button>
      </div>

      {/* Section 2 */}
      <div className="bg-gray-200 transition-all duration-300 overflow-y-auto" style={{ height: sectionHeights.section2 }}>
        {topics && (
          <ScrollArea className="w-full h-[50px] overflow-x-auto whitespace-nowrap py-2">
            <Viewport className="inline-flex">
              {topics.map((topic, index) => (
                <Badge 
                  variant="outline" 
                  key={index} 
                  className="mr-2 bg-blue-500 text-white"
                >
                  {topic}
                </Badge>
              ))}
            </Viewport>
          </ScrollArea>
        )}
        <div className="p-4">
          <Accordion type="multiple" className="flex flex-row flex-wrap h-full justify-between">
            <AccordionItem value="feature-1" className="w-[calc(33.33%-1rem)] rounded bg-white p-4 shadow m-2">
              <AccordionTrigger className="text-lg font-semibold">Summary</AccordionTrigger>
              <AccordionContent className="text-sm mt-4">{summary}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="feature-2" className="w-[calc(33.33%-1rem)] rounded bg-white p-4 shadow m-2">
              <AccordionTrigger className="text-lg font-semibold">Reference Links</AccordionTrigger>
              <AccordionContent className="text-sm mt-4">
                <div className="w-full h-[200px] rounded overflow-auto shadow-inner bg-white">
                  <div className="py-2 px-4">
                    {references?.map((reference, index) => (
                      <div key={index} className="text-base mt-2 pt-2 border-t border-gray-300">
                        <a href={reference} target="_blank" rel="noopener noreferrer">{reference}</a>
                      </div>
                    )) ?? 'No references available or incorrect format'}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="feature-3" className="w-[calc(33.33%-1rem)] rounded bg-white p-4 shadow m-2">
              <AccordionTrigger className="text-lg font-semibold">Contribute</AccordionTrigger>
              <AccordionContent className="text-sm mt-4">Contribute text here</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}